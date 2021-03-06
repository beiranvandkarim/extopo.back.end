
const Resume = require('../../models/resume');

exports.readAllResumes = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      // found section
      const response = await Resume.find();
      if (response && response.length > 0) {
        ctx.status = 200;
        return ctx.body = response;
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
