EXPERIMENTAL
============

If you use this configuration for the 2023.ploneconf.org site as an example for
your own Plone 6 project, please note that this setup was created early 2023,
doesn't use the latest of default scaffolding and project setup from
https://github.com/collective/cookiecutter-plone-starter and has some other
experimental setups in both the frontend and backend directories. 


Changes
-------

The backend directory assumes it will always run as a container and the Makefile
does not contain targets to build from source locally and start the backend 
on the host. 

In this project the frontend directory (Volto) is missing the normal scaffolding
for a Volto project as you would expect it would be generated with the yo
(Yeoman) volto generator (https://github.com/plone/generator-volto). (When you
use cookiecutter-plone-starter as advised in the official documentation, it is
recursively calling the yo volto generator for the frontend directory part. So
it is the same template.

Instead, in this 2023.ploneconf.org setup, the frontend already assumes that you
will do all your project theming, and further configuration from a 'policy' or
theme add'on. This was improved later in 2023 and is now core of the Volto
development best practice: https://6.docs.plone.org/volto/addons/theme.html

The Dockerfile calls a python script called setupAddon, which is injected into
the frontend-build imagesthat is used as a base image to install the correct
@plone/volto package and make sure that all boilerplate is still referenced. 

The helper script:
https://github.com/plone/plone-frontend/blob/16.x/scripts/helper.py

Where it is copied into frontend-builder:
https://github.com/plone/plone-frontend/blob/3edcc2cf2b61770e6b9cf97bf33eabd910254dae/Dockerfile.builder#L37

The drawback of this much cleaner setup is that VS Code and other editors, when
you try to edit from within the running frontend container as it was a
devcontainer, get confused about the missing package.json and node_modules which
are no longer in the /frontend directory or what VS Code considers its
workspacce. This is until now an unsolved problem. 

As a temporary fix you can symlink the actual package.json to the workspace
directory and then VS code does do some code completion.  But even in 'normal'
on your developer machine scaffolded projects the code completion could be
improved for Volto projects and might not work as you would expect in othe
javascript frontend projects. 

These are still unsolved issues we want to fix as a community to improve the
Developer Experience. 


Other experimental Changes
--------------------------
Here are some notes on improvements that were added to the Makefile that
are up for discussion or better implementations/alternatives.

** make build-images  

split to make-build-frontend and make-build-backend so you can build them in
parallel with make -j2 build-images .  There were always sequential

The NOCACHE=1 flag will force the builds to be fresh:
NOCACHE=1 make -j2 build-images

** option for override.yml in backend.yml

I don't want my data in a docker volume, I want a bind mount! Override files to
the rescue. Also for any other customisation for local docker compose
development Rename overide.yml.orig to override.yml and it is loaded after
/devops/dev/local-dev.yml
