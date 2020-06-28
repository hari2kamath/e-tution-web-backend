import "reflect-metadata";
import App from "../../app/app";
import { Controller } from "../../app/util/rest/controller";
import { Application } from "express";
import request from "supertest";
import supertest from "supertest";
import { validateEnv } from "../../app/util/validationHelper";

export class TestServer {

    public static getInstance(controller?: Controller) {
        validateEnv();
        TestServer.instance = new TestServer([
            controller
        ]);
        return TestServer.instance;
    }
    private static instance: TestServer;
    private server: Application;
    private request: supertest.SuperTest<supertest.Test>;
    private constructor(controllerArray: Controller[]) {
        this.server = new App(controllerArray).getServer();
        this.request = request(this.server);
    }

    public async get(url: string, query: { [key: string]: any } = {}, headers?: Object[]) {
        const req = this.request.get(url).query(query);
        this.setHeaders(req, headers);
        const res = await req;
        return res;
    }

    public async post(url: string, data: any = {}, headers?: Object[], ) {
        const req = this.request.post(url);
        this.setHeaders(req, headers);
        const res = await req.send(data);
        return res;
    }

    public async put(url: string, data: any = {}, headers?: Object[], ) {
        const req = this.request.put(url);
        this.setHeaders(req, headers);
        const res = await req.send(data);
        return res;
    }

    // patch(url:string,  headers?:Array<Object>, data:any = {}){

    // }

    private setHeaders(req: request.Test, headers: Object[] | undefined) {
        if (headers && headers.length) {
            headers.forEach((header) => {
                req.set(header);
            });
        }
    }
}
