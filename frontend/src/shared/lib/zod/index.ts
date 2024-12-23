import { string, union, ZodTypeAny } from 'zod';


// Z - https://www.youtube.com/watch?v=S_OojoRxh_A
export const nullishWithTransform = <T, Z extends ZodTypeAny = ZodTypeAny>(
	schema: Z,
	value: T,
) => union([schema, string().length(0)])
	.nullish()
	.transform(v => !v ? value : v);