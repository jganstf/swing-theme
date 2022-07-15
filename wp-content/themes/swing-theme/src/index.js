import Router from './util/Router'
import common from './routes/common'
import home from './routes/home'
import aboutUs from './routes/about'
import singlePost from './routes/single-post'
import pageTemplateTos from './routes/terms'

/**
 * Populate Router instance with DOM routes
 * @type {Router} routes - An instance of our router
 */
const routes = new Router({
	common,
	home,
	aboutUs,
	pageTemplateTos,
	singlePost,
})

/** Load Events */
routes.loadEvents()