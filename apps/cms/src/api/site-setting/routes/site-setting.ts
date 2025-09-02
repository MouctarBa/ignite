/**
 * site-setting router
 */

import { factories } from '@strapi/strapi';
import type { UID } from '@strapi/strapi';

export default factories.createCoreRouter<'api::site-setting.site-setting'>(
  'api::site-setting.site-setting' satisfies UID.ContentType
);
