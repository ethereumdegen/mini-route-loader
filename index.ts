


export type APICall = (req: any, res: any) => any

export interface MiniRoute {
  type:string,
  uri: string,
  method: string,
  controller: string
}

export default class MiniRouteLoader {


  static loadRoutes(expressApp: any, routesConfig: Array<MiniRoute>, controllerClass: any) {
    for (const route of routesConfig) {
      MiniRouteLoader.configureRoute(expressApp, route, controllerClass)
    }
  }

  static configureRoute(expressApp: any, route: MiniRoute, controllerClass: any) {
    console.log('configuring route', route)
 
    let restAction: string = route.type 
    let endpointURI: string = route.uri
    let methodName: string = route.method

    if (typeof endpointURI != 'string' ) {
      throw 'Error: invalid route format for endpointURI'
    }

    if (typeof methodName != 'string') {
      throw 'Error: invalid route format for methodName'
    } 

    if (typeof restAction != 'string') {
      throw 'Error: invalid route format for restAction'
    }

    restAction = restAction.toLowerCase()

    if (restAction == 'get') {
      expressApp.get(endpointURI, async (req: any, res: any) => {
        return await controllerClass[methodName](req, res)
      })
    }

    if (restAction == 'post') {
      expressApp.post(endpointURI, async (req: any, res: any) => {
        return await controllerClass[methodName](req, res)
      })
    }
  }
}
