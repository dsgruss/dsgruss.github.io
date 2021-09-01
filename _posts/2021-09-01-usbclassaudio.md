---
layout: post
title:  "USB Class Audio Considerations"
date:   2021-09-01 09:00:00 -0400
categories: notes
---

A current project I'm working on requires a fairly large amount of audio data to be moved between a
discrete set of microcontrollers. This audio data needs to be an uncompressed [PCM
stream](https://en.wikipedia.org/wiki/Pulse-code_modulation) with eight or more channels per stream,
multiple sources and sinks per device, and multiple devices connected together for central routing.
I decided to take a look at how this might be done using class-compliant USB audio using a variety
of different development boards. This is a summary of a few things I found out.

* From cursory look at the datasheets and the USB spec, it should be plausible in theory to do this
  with USB hi-speed (480 Mbps). The bandwidth is sufficient and is supported by the stm32f4xx
  devices that I looked at. The USB host would provide for data transfer and routing and each device
  would provide the audio sources and sinks through a standard audio interface. This allowed for
  direct testing (using programs like [Audacity](https://www.audacityteam.org/)) and some basic
  sound routing without needing custom software initially. The device could present itself as an
  interface with an endpoint for each parameter, with each endpoint containing multiple channels.
  Since it is class audio, no custom drivers would be needed on the host side as well.

* The stm32f4xx chip that I used (and I think this might be true for all of ST's devices) only
  supports USB full-speed directly from the pins. This means that a separate chip--known as a PHY
  device or just PHY--is needed to connect the microcontroller to the USB port, e.g.
  [USB3300](http://ww1.microchip.com/downloads/en/DeviceDoc/00001783C.pdf). Moreover, the
  [Nucleo-144](https://www.st.com/en/evaluation-tools/nucleo-f429zi.html) development boards I am
  using for testing have an onboard USB port and ethernet port with ethernet PHY, they do not have
  the PHY for hi-speed or host support, so it needs to be added separately.

* The number of USB endpoints is physically limited by the device. For instance, on this development
  board, the number of bi-directional endpoints is limited to four for the integrated USB and six
  when using hi-speed and the separate PHY, rather than the full sixteen as seen in the USB spec.
  This is true for most every device I looked at (the exception being the
  [RP2040](https://datasheets.raspberrypi.org/rp2040/rp2040-datasheet.pdf) which is limited to
  full-speed). I'm not sure exactly why this is the case, but I assume that it is because there is
  dedicated hardware used to generate and parse the actual packets and limiting the number of
  endpoints is a way to keep costs and complexity down. This has ruined plans to expose each audio
  stream as an individual endpoint, which could be acquired or released as needed.[^isoctransfer]
  This would mean some additional work in weaving together all of the endpoints into a single one
  (much like the channels are interleaved together), however...

[^isoctransfer]: It appears that it is possible to send no data over an isochronous transfer even
                 when connected by sending zero-length packets with an offset. Even though the
                 bandwidth is still reserved, this would take some strain out of keeping up with
                 consistent data generation.

* According to the specifications, all channels on a single endpoint must be active at all times;
  there doesn't appear to be a way to selectively enable and disable channels without restarting the
  device with a different configuration. This means a gap in the audio output, which is something
  that I need to avoid. In addition, all of the signals are now constrained to the same bit
  resolution and sample rate. Originally, I thought I could tame excess bandwidth requirements by
  downsampling less important signals. In this configuration, every stream has to run at the highest
  rate, which means audio rates are required even in places where this is not needed. This would
  then mean another side channel is needed for lower frequency data.

* USB bandwidth is aggressively shared between devices. Having a higher speed USB host does not
  necessarily mean that you can run multiples of lower speed devices. Full-speed (12 Mbps) data is
  upgraded to hi-speed (480 Mbps) data through a [transaction
  translator](https://en.wikipedia.org/wiki/USB_hub#Transaction_translator), but most devices only
  have a single translator that is shared between all of the full-speed devices. This means that
  several devices nearing the full-speed limit won't be able to be connected together without
  connecting to separate host controllers. In addition, because the host is used as the
  communication channel, everything needs to be sent twice, effectively halving the available
  bandwidth.

* Configuration descriptors for class devices can be complicated. To get a device to work
  out-of-the-box, then you need to specify a long string of descriptors that describe the internal
  topology of the audio (sound sources and sinks) as well as all the information about the
  endpoints. The [USB audio 1.0 spec](https://www.usb.org/sites/default/files/audio10.pdf) will give
  you an idea of the things that need to go into writing a correct configuration descriptor.

* Lastly, device problems at the driver level are very opaque. Most often this will be some form of
  "device failed to start" or "configuration description error".
  [Wireshark](https://www.wireshark.org/) has been incredibly useful not only for looking at the raw
  USB data streams, but also knows how to parse the whole hierarchy of USB audio class configuration
  descriptors and can tell when they are malformed.

These problems are definitely solvable, but it might be more effort than it is worth compared to
some other method of setting up a large number of audio streams.
