const userRoutes = require('./user.route')
const taskRoutes = require('./task.route');
const accountRoutes = require('./account.route');
const projectRoutes = require('./project.route');
const postRoutes = require('./post.route')
const designRoutes = require('./design.route')



module.exports = (app) => {
    const version = "/api/v1"
    app.use(version + '/tasks', taskRoutes);
    app.use(version + '/users', userRoutes);
    app.use(version + '/accounts', accountRoutes);
    app.use(version + '/project', projectRoutes);
    app.use(version + "/post", postRoutes);
    app.use(version + '/design', designRoutes);
}