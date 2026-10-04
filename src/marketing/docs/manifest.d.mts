import type { DocGroup } from './types';

export declare const DOC_GROUPS: DocGroup[];
export declare const DOC_SLUGS_BY_GROUP: Record<string, string[]>;
export declare const DOC_SLUGS: string[];
export declare const DOC_PATHS: string[];
export declare function docPathFor(slug: string): string;
