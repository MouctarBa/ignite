/**
 * site-setting controller
 */

import { factories } from '@strapi/strapi';
import type { UID } from '@strapi/strapi';

export default factories.createCoreController<
  'api::site-setting.site-setting',
  {}
>(
  'api::site-setting.site-setting' satisfies UID.ContentType
);
