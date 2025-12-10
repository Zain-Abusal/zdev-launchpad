/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as functions_activity from "../functions/activity.js";
import type * as functions_blog from "../functions/blog.js";
import type * as functions_docs from "../functions/docs.js";
import type * as functions_email from "../functions/email.js";
import type * as functions_forms from "../functions/forms.js";
import type * as functions_metrics from "../functions/metrics.js";
import type * as functions_projects from "../functions/projects.js";
import type * as functions_search from "../functions/search.js";
import type * as functions_storage from "../functions/storage.js";
import type * as utils_auth from "../utils/auth.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "functions/activity": typeof functions_activity;
  "functions/blog": typeof functions_blog;
  "functions/docs": typeof functions_docs;
  "functions/email": typeof functions_email;
  "functions/forms": typeof functions_forms;
  "functions/metrics": typeof functions_metrics;
  "functions/projects": typeof functions_projects;
  "functions/search": typeof functions_search;
  "functions/storage": typeof functions_storage;
  "utils/auth": typeof utils_auth;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
