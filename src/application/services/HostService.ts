import  { Host } from "@/domain/quiz/Host.js";

export class HostService
{
    async createHost(host:Host):Promise<Host>{
        return new Host(
            host.id,
            host.name,
            host.user
        );
    }
}