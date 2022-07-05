import Router from './util/Router'
import common from './routes/common'
import home from './routes/home'
import singlePost from './routes/single-post'

/**
 * Populate Router instance with DOM routes
 * @type {Router} routes - An instance of our router
 */
const routes = new Router({
	common,
	home,
	singlePost
})

/** Load Events */
routes.loadEvents()