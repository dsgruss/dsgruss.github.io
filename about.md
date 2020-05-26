---
layout: page
title: About
permalink: /about/
---
![me](./assets/img/me.jpg){:width="150" border="5" align="right"}

## Technologies

* **python:** Used for data processing (parsing and analysis) and visualization (typically [Matplotlib](https://matplotlib.org/) generated plots) as well as a large amount of the data generation through simulation. When the system can described completely in terms of linear algebra (typical of non-interacting models), then the bulk of the computation time is spent in the underlying [BLAS](http://www.netlib.org/blas/) and [LAPACK](http://performance.netlib.org/lapack/) libraries. This allowed multicore processing of expensive matrix operations within the python interpreter (in this case I [compiled numpy using the Intel MKL](https://software.intel.com/content/www/us/en/develop/articles/numpyscipy-with-intel-mkl.html)). Access to [numerical integration](https://docs.scipy.org/doc/scipy/reference/tutorial/integrate.html), [curve fitting](https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.curve_fit.html), etc. was then provided via [SciPy](https://docs.scipy.org/doc/scipy/reference/index.html). [line_profiler](https://github.com/pyutils/line_profiler) is very useful for finding bottlenecks in heavy numerical code. A typical experimental workflow would be something like (_define ranges of parameters and ready them for job submission_)&rarr;(_push job prerequisites to cluster_)&rarr;(_more general python library to handle bulk computation_)&rarr;(_heavy data analysis_)&rarr;(_pull data from cluster_)&rarr;(_light data analysis and plotting_), with each of these automated as a chain of dependencies and governed by their own set of executables. In an ideal world, this would be automated end-to-end so one command could take it from simulation to publication, but some of these steps still required manual intervention from time to time.

* For situations where speed was critical (usually the case for many-body type simulations), a compiled language--**C/C++** or [cython](https://cython.org/)--was used to increase performance. In particular, [ITensor](http://itensor.org/) was invaluable for implementing and simulating tensor networks. Here is where I've also used [ScaLAPACK](https://netlib.sandia.gov/scalapack/) and raw [MPI](https://computing.llnl.gov/tutorials/mpi/) for occasional problem that didn't fit into the above.

* Model prototyping was usually done in **Mathematica**, both to find analytic solutions for reduced problems (where the algebra system is used as check on the implementation) and for lightweight numerical processing (to define a set of test cases to the final implementation). Additionally, I used it to explore various approximations of analytic forms that would be tedious to calculate by hand, though any exploratory data visualization was usually easier done in [IPython](https://ipython.org/).

* Document generation was handled by **Tex/Latex**. For each paper/presentation, a "final" python script was used to generate the publication-ready images (with analysis separated out if lengthy), which were referenced directly by the finished document. Occasionally [Abode Illustrator](https://www.adobe.com/products/illustrator.html) or [Inkscape](https://inkscape.org/) was used to stitch figures together or create a diagram, but the majority of figures were generated from code/text. This was especially helpful for tracking changes and managing templates. The [Beamer](https://en.wikipedia.org/wiki/Beamer_(LaTeX)) class was used to generate slides in the same manner.

* As for the nuts-and-bolts, the usual suspects are here: **git** (naturally) was used for version tracking of all of the above, computation resources were accessible via [PBS](https://en.wikipedia.org/wiki/Portable_Batch_System) or [SLURM](https://slurm.schedmd.com/) queueing system, so some **bash** scripts are used for arrays of simulation submission (not to mention use as local shell), **pip** and **venv** for keeping dependencies in line (in C/C++ they were usually simple enough to be compiled statically), **ssh**/**scp** for communication/data management, **make**/**cmake**/**scons** for a build system, etc. I usually develop in **emacs** but I'm not terribly attached to it.

* Other things I've had some experience with in my research career: **Julia** (at the time it was very early in it's development), **R** (which was a little rough with complex matrix exponentials), **MATLAB** (did a lot of early work here but ran into licensing issues and [Octave](https://www.gnu.org/software/octave/) was very slow at the time), **Fortran** (inherited simulation code), **AWS** (using spot instances to price out certain calculations) and [blender](https://www.blender.org/) (diagrams). I've also used [NAMD](https://www.ks.uiuc.edu/Research/namd/) and [GROMACS](http://www.gromacs.org/) for molecular dynamics simulations, usually in the context of analyzing completed simulations (with [VMD](https://www.ks.uiuc.edu/Research/vmd/) used for visualization). I've done some light work in density functional theory using [VASP](https://www.vasp.at/) and [WIEN2k](http://susi.theochem.tuwien.ac.at/).

* Coursework was usually done in one of **python**, **C/C++**, or **Java**, with my computer science senior project being written in [django](https://www.djangoproject.com/). I also worked as an undergraduate writing and supporting **LabVIEW** instrumentation.

* Although **python** is what I'm most comfortable with, I've tried out a number of things as a hobby/side project. Embedded development (initially through [Arduino](https://www.arduino.cc/), then [Photon](https://docs.particle.io/photon/), then STM development boards): I have a hacked together "home automation" system that uses a [Raspberry Pi](https://www.raspberrypi.org/) together with an assortment of microcontrollers talking to an [MQTT broker](https://mosquitto.org/). At various times I've dabbled in web development with various combinations of **node.js**, [flask](https://flask.palletsprojects.com/en/1.1.x/), **ruby** on rails, **react**, and [jekyll](https://jekyllrb.com/). I've done introductory online courses on **Haskell**, **pytorch**/**keras**, and [scikit-learn](https://scikit-learn.org/stable/index.html) and am working towards getting those skills "production ready".

## Work Experience

#### Postdoctoral Research Associate (2016 - 2017), Graduate Student Researcher (2015 - 2016)
*[National Institute of Standards and Technology](https://www.nist.gov/)/[University of Maryland](https://umd.edu/)* -
Worked at the [Center for Nanoscale Science and Technology](https://www.nist.gov/cnst) on electron transfer processes in sensing, catalysis, and nanoelectronics, as well as developed computational methodology for complex systems.

#### Graduate Research Assistant (2011 - 2015)
*[Oregon State University](https://oregonstate.edu/)* -
Investigations of dynamics of quantum systems: fermionic transport in interacting systems, numerical methods of time evolution (time-dependent density matrix renormalization group [tDMRG], matrix product states), open quantum systems, quantum to classical transitions in non-equilibrium steady states.

#### Teaching Assistant (2010 - 2015)
*[Oregon State University](https://oregonstate.edu/)* -
Teaching assistant for a broad range of physics courses: general physics with and without calculus, upper division programs, online-based astronomy sequence, and graduate level solid state physics.

## Publications

Please check my [Google Scholar](http://scholar.google.com/citations?user=ojlhWVkAAAAJ&amp;hl=en) page for an updated and sortable list of publications.

### Papers

D. Gruss, C.C. Chien, J. Barreiro, M. Di Ventra, and M. Zwolak. An energy-resolved atomic scanning probe,  
[_New J. Phys._ **20** (2018) 115005](https://iopscience.iop.org/article/10.1088/1367-2630/aaedcf/meta),
[arXiv preprint arXiv:1610.01903](http://arxiv.org/abs/1610.01903)

D. Gruss, A. Smolyanitsky, and M. Zwolak. Graphene deflectometry for sensing molecular processes at the nanoscale,  
[arXiv preprint arXiv:1804.02701](https://arxiv.org/abs/1804.02701)

J. Elenewski, D. Gruss, and M. Zwolak, Communication: Master equations for electron transport: The limits of the Markovian limit,  
[_J. Chem. Phys._ **147**, 151101 (2017)](https://aip.scitation.org/doi/abs/10.1063/1.5000747),
[arXiv preprint arXiv:1705.00566](https://arxiv.org/abs/1705.00566)

D. Gruss, A. Smolyanitsky, and M. Zwolak. Communication: Relaxation-limited electronic currents in extended reservoir simulations,  
[_J. Chem. Phys._ **147**, 141102 (2017)](https://aip.scitation.org/doi/abs/10.1063/1.4997022),
[arXiv preprint arXiv:1707.06650](https://arxiv.org/abs/1707.06650)

D. Gruss, K. A. Velizhanin, and M. Zwolak. Landauer's formula with finite-time relaxation: Kramers' crossover in electronic transport,  
[_Sci. Rep._ **6**, 24514 (2016)](http://www.nature.com/articles/srep24514),
[arXiv preprint arXiv:1604.02962](http://arxiv.org/abs/1604.02962)

C.C. Chien, D. Gruss, M. Di Ventra, and M. Zwolak. Interaction-induced conducting-nonconducting transition of ultra-cold atoms in 1d optical lattices,  
[_New J. Phys._ **15** (2013) 063026](http://stacks.iop.org/1367-2630/15/063026),
[arXiv preprint arXiv:1203.5094](http://arxiv.org/abs/1203.5094v2)

### Thesis

Doctoral Dissertation: Quantum and Classical Simulation of Electronic Transport at the Nanoscale  
[ScholarsArchive@OSU](http://hdl.handle.net/1957/59108), [PDF](./assets/papers/GrussDanielS2016.pdf), 2016.

Honors Undergraduate Thesis: Applied Computing Techniques for Holographic Optical Tweezers  
[OSU Library Collections](http://ir.library.oregonstate.edu/xmlui/bitstream/handle/1957/17625/Full%20ThesisGruss.pdf), 2010.

### Presentations

* APS March Meeting 2016 - [A24.00006](http://meetings.aps.org/Meeting/MAR16/Session/A24.6)
* APS March Meeting 2014 - [Y35.00010](http://meetings.aps.org/Meeting/MAR14/Event/216394)
* APS March Meeting 2013 - [B41.00009](./assets/presentations/apsmarch2013.pdf)

## Research

Zwolak Research Group

## Education

#### [Oregon State University](https://oregonstate.edu/), Fall 2010 - Spring 2016

College of Science, Doctor of Philosophy Physics

#### [Oregon State University](https://oregonstate.edu/), Winter 2007 - Spring 2010

College of Science, H.B.S. Computational Physics, H.B.S. Physics (Applied Option),  
College of Engineering, H.B.S. Engineering Physics,  
Computer Science Minor, Summa Cum Laude,

## Teaching

* Spring 2015 - [Physics 205](http://catalog.oregonstate.edu/CourseDetail.aspx?subjectcode=PH&coursenumber=205)/[206](http://catalog.oregonstate.edu/CourseDetail.aspx?subjectcode=PH&coursenumber=206)/[207](http://catalog.oregonstate.edu/CourseDetail.aspx?subjectcode=PH&coursenumber=207)
* Winter 2015 - [Physics 205](http://catalog.oregonstate.edu/CourseDetail.aspx?subjectcode=PH&coursenumber=205)/[206](http://catalog.oregonstate.edu/CourseDetail.aspx?subjectcode=PH&coursenumber=206)/[207](http://catalog.oregonstate.edu/CourseDetail.aspx?subjectcode=PH&coursenumber=207)
* Fall 2014 - [Physics 205](http://catalog.oregonstate.edu/CourseDetail.aspx?subjectcode=PH&coursenumber=205)/[206](http://catalog.oregonstate.edu/CourseDetail.aspx?subjectcode=PH&coursenumber=206)
* Summer 2014 - [Physics 201](http://physics.oregonstate.edu/~walshke/COURSES/ph201/?q=ph201)
* Spring 2014 - [Physics 575](http://physics.oregonstate.edu/~tate/COURSES/ph575/)
* Winter 2014 - [Physics 202](http://www.physics.oregonstate.edu/~walshke/COURSES/ph202/)
* Fall 2013 - [Physics 421](http://www.physics.oregonstate.edu/~grahamat/COURSES/ph421/)
* Spring 2013 - [Physics 423](http://physics.oregonstate.edu/~roundyd/COURSES/ph423/)
* Winter 2013 - [Physics 424](http://www.physics.oregonstate.edu/~minote/COURSES/ph424/doku.php)
* Fall 2012 - [Physics 320](http://physics.oregonstate.edu/~roundyd/COURSES/ph320/?q=ph320), [Physics 422/522](http://www.physics.oregonstate.edu/~kustuscm/COURSES/ph422/)
