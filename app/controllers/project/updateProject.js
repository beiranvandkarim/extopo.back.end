
const Project = require('../../models/project');

module.exports.updateProject = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      ctx.verifyParams({
        name: { type: 'string', required: true },
        description: { type: 'string', required: true },
        // todo make this right
        employees: { type: 'string', required: true },
        employer: { type: 'string', required: true }
      });
    } catch (err) {
      ctx.status = 400;
      ctx.body = err.errors.map((val) => {
        return val.field + ' ' + val.message;
      });
      return;
    }
    try {
      // const { name, description, date, employees, employer } = ctx.body;
      const { name, description, date, employees, employer } = ctx.request.body;

      const updatedFields = {};

      (name) && Object.assign(updatedFields, { name });
      (description) && Object.assign(updatedFields, { description });
      (date) && Object.assign(updatedFields, { date });
      (employees) && Object.assign(updatedFields, { employees });
      (employer) && Object.assign(updatedFields, { employer });

      // update section
      const response = await Project.updateOne({ _id: ctx.params.id }, updatedFields);
      if (response.n === 1) {
        ctx.status = 200;
        return ctx.body = 'the project updated.';
      }
      // not found section
      ctx.status = 404;
      return ctx.body = 'NOT found';
    } catch (e) {
      ctx.status = 500;
      ctx.body = e.message;
    }
  } else {
    ctx.status = 401;
    return ctx.body = 'NOT Authenticated';
  }
};
