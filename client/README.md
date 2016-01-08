#Setup

install flow:

    npm install flow-bin --global

    flow init //creates .flowconfig file

add

        /*
        * @flow
        */

or
        /*
        * @flow weak
        */

to file which you want to type-check

add

    npm install --save-dev empty

and add to .flowconfig so webpack require of stylus-files will be ignored

    [options]
    module.name_mapper='.*\(.styl\)' -> 'empty/object'
