import z from "zod";
import { RoleName } from "./access-control";
import { JsonObject } from "./json";
import { IsOptional, Prettify, ZodInfer } from "./utility-types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnySchema = z.ZodType<any, any, any>;

export type UrlParamValue = string | number | boolean;
export type UrlSearchParamValue =
  | UrlParamValue
  | Array<UrlParamValue>
  | JsonObject // serializable objects
  | undefined
  | null;

export type UrlParams = Record<string, UrlParamValue>;
export type UrlSearchParams = Record<string, UrlSearchParamValue>;

type ParamsArg<P extends z.ZodType> = P extends z.ZodVoid
  ? unknown
  : IsOptional<ZodInfer<P>> extends true
  ? { params?: ZodInfer<P> }
  : { params: ZodInfer<P> };

type SearchParamsArg<S extends z.ZodType> = S extends z.ZodVoid
  ? unknown
  : IsOptional<ZodInfer<S>> extends true
  ? { searchParams?: ZodInfer<S> }
  : { searchParams: ZodInfer<S> };

type MergedArgs<P extends z.ZodType, S extends z.ZodType> = Prettify<
  ParamsArg<P> & SearchParamsArg<S>
>;

export type RouteBuildFn<P extends z.ZodType, S extends z.ZodType> =
  // Check: Is the entire Merged Argument object optional?
  IsOptional<MergedArgs<P, S>> extends true
    ? // YES: The function argument is optional (?)
      (args?: MergedArgs<P, S>) => string
    : // NO: The function argument is required
      (args: MergedArgs<P, S>) => string;

export type RouteConfig<
  TParams extends AnySchema = AnySchema,
  TSearchParams extends AnySchema = AnySchema
> = {
  path: string; // path representation (dynamic params must be wrapped into [])
  build: RouteBuildFn<TParams, TSearchParams>; // path builder for path generating
  isPrivate?: boolean; // private route. Redirects to login if not logged in
  roles?: RoleName[]; // roles required to access
  isHidden?: boolean; // hidden from redirecting or unavailable
  title?: (...args: string[]) => string; // title of the page with arguments
  icon?: string; // icon of the page
  sitemap?: {
    // sitemap options
    priority?: number;
    changefreq?:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
    exclude?: boolean;
  };
  paramsSchema?: TParams; // validation schema for dynamic params
  searchParamsSchema?: TSearchParams; // validation schema for search params
};
