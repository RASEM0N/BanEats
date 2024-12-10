import { ModuleMetadata } from '@nestjs/common';
import { JwtConfig } from './jwt.module';

export interface JwtModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	inject?: any[];
	useFactory?: (...args: any[]) => Promise<JwtConfig> | JwtConfig;
}
