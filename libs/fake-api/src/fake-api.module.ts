import { AnonymousAuthenticationProvider } from '@microsoft/kiota-abstractions';
import { FetchRequestAdapter } from '@microsoft/kiota-http-fetchlibrary';
import { DynamicModule } from '@nestjs/common';
import { FAKE_API_SERVICE_TOKEN } from './fake-api.constants.ts';
import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './fake-api.module-definition.ts';
import { createApiClient } from './generated/apiClient.ts';

export class FakeApiModule extends ConfigurableModuleClass {
  private static nestLifecycleHooks: string[] = [
    'onModuleInit',
    'onApplicationBootstrap',
    'onModuleDestroy',
    'beforeApplicationShutdown',
    'onApplicationShutdown',
  ];
  private static apiServicePropsCalledByNest = new Set([
    'then',
    ...FakeApiModule.nestLifecycleHooks,
  ]);

  static register(
    { baseUrl, requestAdapter, ...restOptions }: typeof OPTIONS_TYPE,
  ): DynamicModule {
    requestAdapter ||= new FetchRequestAdapter(
      new AnonymousAuthenticationProvider(),
    );
    if (baseUrl) {
      requestAdapter.baseUrl = baseUrl;
    }

    return {
      ...super.register(restOptions),
      providers: [{
        provide: FAKE_API_SERVICE_TOKEN,
        // NOTE: This is a workaround to use the API client with NestJS dependency injection mechanism.
        // For further details, please refer to the following comment:
        // https://github.com/microsoft/kiota-typescript/issues/1075#issuecomment-1987042257
        useValue: new Proxy(createApiClient(requestAdapter), {
          get: (target, prop) =>
            FakeApiModule.apiServicePropsCalledByNest.has(prop.toString())
              ? undefined
              : Reflect.get(target, prop),
        }),
      }],
      exports: [FAKE_API_SERVICE_TOKEN],
    };
  }
}
