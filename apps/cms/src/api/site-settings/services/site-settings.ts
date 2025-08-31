/**
 * site-settings service
 */

import { factories } from '@strapi/strapi';
import type { UID } from '@strapi/strapi';

export default factories.createCoreService<
  'api::site-settings.site-settings',
  {}
>(
  'api::site-settings.site-settings' satisfies UID.ContentType
);
