import { Item } from "./core/Item"

function routeTest(req: Bun.BunRequest) {
    return Response.json({
        method: req.method,
        time: (new Date).toLocaleString('pt-BR'),
        body: req.body
    })
}

const { hostname, port } = Bun.serve({
    routes: {
        "/debug": new Response(Bun.file("public/debug.html")),
        "/test": routeTest,
        "/item": {
            POST: async (req) => {
                let data

                try {
                    data = await req.body?.json()
                } catch (e) {
                    return Response.json("JSON BODY MALFORMD", { status: 400 })
                }

                if (!data?.title) {
                    return Response.json("JSON BODY TITLE REQUIRED", { status: 400 })
                }

                let item

                try {
                    item = Item.create(data.title)
                } catch (e) {
                    return Response.json('ITERNAL SERVER ERROR', { status: 500 })
                }

                return Response.json(item)
            }
        },
        "/item/:id": {
            GET: (req) => {
                const id = Number(req.params.id)
                if (Number.isNaN(id)) {
                    return Response.json('numero invalido', { status: 400 })
                }

                const item = Item.load(id)
                return Response.json(item)
            }
        }
    },
    fetch: () => new Response('Not Found', { status: 404 })
})

console.log(`⚡ Server running on http://${hostname}:${port}`)