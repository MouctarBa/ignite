/**
 * site-settings router
 */

import { factories } from '@strapi/strapi';
import type { UID } from '@strapi/strapi';

export default factories.createCoreRouter<'api::site-settings.site-settings'>(
  'api::site-settings.site-settings' satisfies UID.ContentType
);
