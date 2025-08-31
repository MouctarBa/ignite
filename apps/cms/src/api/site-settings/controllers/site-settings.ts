/**
 * site-settings controller
 */

import { factories } from '@strapi/strapi';
import type { UID } from '@strapi/strapi';

export default factories.createCoreController<
  'api::site-settings.site-settings',
  {}
>(
  'api::site-settings.site-settings' satisfies UID.ContentType
);
