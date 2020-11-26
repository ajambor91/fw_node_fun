import {ServerResponse} from "http";
import {NotFound, ResponseContainer} from "../../responses/response";

export abstract class AbstractController {
   set serverResponse(res: ServerResponse) {
        ResponseContainer.serverResponse = res;
    }

}