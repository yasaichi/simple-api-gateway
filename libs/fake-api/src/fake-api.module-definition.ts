import { ConfigurableModuleBuilder } from '@nestjs/common';
import { type FakeApiModuleOptions } from './interfaces/fake-api-module-options.interface.ts';

export const { ConfigurableModuleClass, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<FakeApiModuleOptions>().build();
