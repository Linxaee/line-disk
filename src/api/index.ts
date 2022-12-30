import Request from "./requests/request";
import { BASE_URL, TIME_OUT } from "./requests/config";

const LinRequest = new Request({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
});

export default LinRequest;
export * from "./uploading";
export * from "./files";
