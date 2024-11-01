import * as chai from 'chai';
import * as spies from 'chai-spies';
import {Vue} from 'vue-property-decorator';
import {config} from '@vue/test-utils'
//import './index';

chai.use(spies);
import VueRx from 'vue-rx';

Vue.use(VueRx);

config.logModifiedComponents = false;

/*
 * Ok, this is kinda crazy. We can use the context method on
 * require that webpack created in order to tell webpack
 * what files we actually want to require or import.
 * Below, context will be a function/object with file names as keys.
 * Using that regex we are saying look in ../src then find
 * any file that ends with spec.ts and get its path. By passing in true
 * we say do this recursively
 */
var testContext = require.context('.', true, /\.spec\.ts/);

/*
 * get all the files, for each file, call the context function
 * that will require the file and load it up here. Context will
 * loop and require those spec files here
 */
function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

// requires and returns all modules that match
var modules = requireAll(testContext);
