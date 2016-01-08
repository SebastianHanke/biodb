var path = require('path')

var ROOT = path.join(__dirname, '..')

module.exports = {
    DIST_DIRECTORY: path.join(ROOT, 'dev'),
    PROD_DIRECTORY: path.join(ROOT, 'prod'),
    SRC_DIRECTORY: path.join(ROOT, 'src'),
    ROOT_DIRECTORY: ROOT
}