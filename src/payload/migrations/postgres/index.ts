import * as migration_20261017_092407_initial_schema from './20261017_092407_initial_schema';
import * as migration_20261017_093151_interface_labels from './20261017_093151_interface_labels';
import * as migration_20261017_103321_editorial_content_controls from './20261017_103321_editorial_content_controls';
import * as migration_20261018_170119_figma_contact_update from './20261018_170119_figma_contact_update';
import * as migration_20261018_183306_contact_form_builder from './20261018_183306_contact_form_builder';
import * as migration_20261019_063411_email_settings from './20261019_063411_email_settings';

export const migrations = [
  {
    up: migration_20261017_092407_initial_schema.up,
    down: migration_20261017_092407_initial_schema.down,
    name: '20261017_092407_initial_schema',
  },
  {
    up: migration_20261017_093151_interface_labels.up,
    down: migration_20261017_093151_interface_labels.down,
    name: '20261017_093151_interface_labels',
  },
  {
    up: migration_20261017_103321_editorial_content_controls.up,
    down: migration_20261017_103321_editorial_content_controls.down,
    name: '20261017_103321_editorial_content_controls',
  },
  {
    up: migration_20261018_170119_figma_contact_update.up,
    down: migration_20261018_170119_figma_contact_update.down,
    name: '20261018_170119_figma_contact_update',
  },
  {
    up: migration_20261018_183306_contact_form_builder.up,
    down: migration_20261018_183306_contact_form_builder.down,
    name: '20261018_183306_contact_form_builder',
  },
  {
    up: migration_20261019_063411_email_settings.up,
    down: migration_20261019_063411_email_settings.down,
    name: '20261019_063411_email_settings'
  },
];
