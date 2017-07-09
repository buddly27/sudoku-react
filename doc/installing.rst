.. _installing:

**********
Installing
**********

.. highlight:: bash

.. _installing/building_from_source:

Building from source
====================

Ensure you have :term:`Node.js` (>6.0) installed.

Then obtain a copy of the source by either downloading the
`zipball <https://github.com/buddly27/sudoku-react/archive/master.zip>`_
or cloning the public repository::

    git clone https://github.com/buddly27/sudoku-react.git
    cd sudoku-react

Install dependencies using :term:`NPM`::

    npm install

Build a production ready version of the application::

    npm run build

Deploy the built files behind a web-server.

To run from source when actively developing, you can do::

    npm run start

This will use an included lightweight server and provide automatic reloading of
the application on code change.

.. _installing/building_from_source/documentation:

Building documentation from source
----------------------------------

Documentation is built using :term:`Sphinx` which runs under :term:`Python`.

Ensure you have installed the 'extra' packages required for building the
documentation::

    pip install .[doc]

Then you can build the documentation with the command::

    python setup.py build_sphinx

View the result in a browser at::

    file:///path/to/sudoku-react/build/doc/html/index.html

.. _installing/building_from_source/tests:

Running tests against the source
--------------------------------

With a copy of the source it is also possible to run the unit tests::

    npm test

Ensure that the code linting is correct with the following command::

    npm run lint

