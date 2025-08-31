import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const roleService = strapi.plugins['users-permissions'].services.role
    const roles = await roleService.find()
    const publicRole = roles.find((role: any) => role.type === 'public')
    if (publicRole) {
      await roleService.updateRole(publicRole.id, {
        permissions: {
          ...publicRole.permissions,
          'api::homepage.homepage': {
            find: true,
          },
          'api::site-settings.site-settings': {
            find: true,
          },
        },
      })
    }
  },
};
