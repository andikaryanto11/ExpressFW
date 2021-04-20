
class Kernel {

     /**
      * global middlewares will be applied to any request if you set the middlewares in array bellow
      * @return {[]}
      */
     static get middlewares() {
          return [
               //You middle ware goes here
               // TestMiddleware
          ]
     }

     /**
      * Group middlewares will be applied to any request in specific web or api group
      * @return {[]}
      */
     static get middlewareGroups() {
          return {
               web: [
                    //You middle ware goes here
                    // TestMiddleware
               ],
               api: [
                    //You middle ware goes here
               ]
          }
     }
}

export default Kernel;