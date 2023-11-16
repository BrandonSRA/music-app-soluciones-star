This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Prueba de Desarrollo - CRUD de Cantantes

## ¡Hola!

Estamos emocionados de que estés interesado en formar parte de nuestro equipo de desarrollo. Para evaluar tus habilidades y conocimientos, te presentamos una prueba técnica para crear un CRUD (Crear, Leer, Actualizar y Eliminar) de cantantes.

## Descripción:

El objetivo de esta prueba es crear una aplicación web que conste de dos partes: una API para el backend, utilizando Next.js, y un frontend para interactuar con la API, utilizando React.js con Axios o Fetch para llamar los endpoints de la API.

## Backend:

Crea un proyecto con Next.js.
Implementa un módulo y controlador para la entidad "Cantantes
Define los siguientes endpoints en el controlador:

- Listar todos los cantantes.
- Obtener un cantante por su ID.
- Crear un nuevo cantante.
- Actualizar los datos de un cantante existente.
- Eliminar un cantante por su ID.

## Frontend:

Crea un proyecto con React.js para el frontend.
Implementa una página que muestre una tabla con los cantantes obtenidos desde la API.
Asegúrate de que la tabla muestre los campos adecuados de cada cantante (por ejemplo: ID, nombre, edad, género musical).
Agrega funcionalidades para crear, actualizar y eliminar cantantes utilizando peticiones a la API.

# Desarrollo de la Prueba

## Backend:

Se creó un CRUD con Next.js en conjunto con una base de datos a través de Prisma. Para hacer la consulta a la base de datos PostgreSQL, se creó un modelo de datos con los campos requeridos para la prueba. También se creó un controlador para la entidad "Cantantes". Los endpoints definidos en el controlador son:

- **GET:** Para listar todos los cantantes.
- **PUT:** Para obtener un cantante por su ID.
- **POST:** Para crear un nuevo cantante.
- **DELETE:** Para eliminar un cantante por su ID.

### configuración de la base de datos:

Para la configuración de la base de datos se utilizó Prisma. Se creó un archivo `schema.prisma` en la raíz del proyecto con la siguiente configuración:

```Typescript
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Creación del modelo de datos:

Para la creación del modelo de datos se creó en el archivo `schema.prisma` en la raíz del proyecto con la siguiente configuración:

```Typescript
model Singers {
  id        String   @id @default(cuid())
  avatar    String?
  name      String? @unique
  age       Int?
  gender    String?
  createdAt DateTime @default(now()) @map(name: "created_at")
  updatedAt DateTime @updatedAt @map(name: "updated_at")

  @@map(name: "singers")
```

### Listar todos los cantantes:

Para listar todos los cantantes se creó un endpoint con el método GET en el archivo `/api/singers/` del controlador. Este endpoint hace una consulta a la base de datos para obtener todos los cantantes registrados. La consulta se realiza con el método findMany() de Prisma.

```Typescript
 export async function GET() {
  const singers = await prisma.singers.findMany({});
  return NextResponse.json(singers);
}
```

## Obtener un cantante por su ID:

Para obtener un cantante por su ID se creó un endpoint con el método PUT en el archivo `/api/singers/:id` del controlador. Este endpoint hace una consulta a la base de datos para obtener un cantante por su ID. La consulta se realiza con el método findUnique() de Prisma.

```Typescript
 export async function GET({ params }) {
  const { id } = params;
  const singer = await prisma.singers.findUnique({
    where: { id: parseInt(id) },
  });
  return NextResponse.json(singer);
}
```

## Crear un nuevo cantante:

Para crear un nuevo cantante se creó un endpoint con el método POST en el archivo `/api/singers/` del controlador. Este endpoint hace una consulta a la base de datos para crear un nuevo cantante. La consulta se realiza con el método create() de Prisma.

```Typescript
export async function POST(request: Request, _params: any) {
  const { name, age, avatar, gender } = await request.json();
  const singer = await prisma.singers.create({
    data: {
      name,
      age,
      avatar,
      gender,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  return NextResponse.json(singer);
}
```

## Actualizar los datos de un cantante existente:

Para actualizar los datos de un cantante existente se creó un endpoint con el método PUT en el archivo `/api/singers/:id` del controlador. Este endpoint hace una consulta a la base de datos para actualizar los datos de un cantante por su ID. La consulta se realiza con el método update() de Prisma.

```Typescript
export async function PUT({ params, body }) {
  const { id } = params;
  const { name, age, genre } = body;
  const singer = await prisma.singers.update({
    where: { id: parseInt(id) },
    data: { name, age: parseInt(age), genre },
  });
  return NextResponse.json(singer);
}
```

## Eliminar un cantante por su ID:

Para eliminar un cantante por su ID se creó un endpoint con el método DELETE en el archivo`/api/singers/:id` del controlador. Este endpoint hace una consulta a la base de datos para eliminar un cantante por su ID. La consulta se realiza con el método delete() de Prisma.

```Typescript
export async function DELETE({ params }) {
  const { id } = params;
  const singer = await prisma.singers.delete({
    where: { id: parseInt(id) },
  });
  return NextResponse.json(singer);
}
```

# Frontend:

## Estructura del Frontend:

Se creó un proyecto con React.js para el frontend. Se implementó una página que muestra una tabla con los cantantes obtenidos desde la API. La tabla presenta los campos adecuados de cada cantante (ID, nombre, edad, género musical). Además, se agregaron funcionalidades para crear, actualizar y eliminar cantantes utilizando peticiones a la API.

---

### Configuración del proyecto:

Para la configuración del proyecto se utilizó el comando `npx create-next-app` para crear un proyecto con Next.js.

### Creación de la tabla:

para la creación de la tabla se creo un hook personalizado en el archivo `/hooks/use-singers.ts` para hacer el llamado a la API. Este hook realiza diferentes llamados a la API dependiendo del método que se le pase como parámetro.se hace el llamado con el método fetch() de JavaScript.

## creación del contexto:

para la creación del contexto se creo una carpeta providers en la raíz del proyecto. Dentro de esta carpeta se creó un archivo `singers-provider.tsx` con la siguiente configuración:

```Typescript
export interface SingersContextType extends UseSingersType {}

const SingersContext = createContext<SingersContextType>(
  {} as SingersContextType
);

export const useSingersContext = () => useContext(SingersContext);

export const SingersProvider = ({ children }: { children: ReactNode }) => {
  const context = useSingers();

  return (
    <SingersContext.Provider value={context}>
      {children}
    </SingersContext.Provider>
  );
};
```

### Listar todos los cantantes:

en el archivo `app/page.tsx` se importo el provider creado anteriormente y se envolvió la aplicación con el provider para que todos los componentes tengan acceso al contexto. Se importo el hook useSingersContext para hacer el llamado a la API. y se realizo la tabla con los datos obtenidos de la API. Se utilizo el componente TableContainer de Material UI para la creación de la tabla. Se utilizo el componente ContentLoader de React Content Loader para mostrar un loader mientras se hace la consulta a la API. Se utilizo el componente TableMenu para crear, actualizar y eliminar cantantes. Se utilizo el componente ModalManageSinger para mostrar que se creo, actualizo y elimino los cantantes.

```Typescript
export default function Home() {
  const { singers, loading } = useSingersContext();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loading ? (
        <div className="bg-gray-800 flex min-h-screen items-start justify-center w-7/12 m-auto p-10">
          <ContentLoader viewBox="0 0 380 100"    backgroundColor={'#333'}
    foregroundColor={'#999'}>
            {/* Only SVG shapes */}
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="10" />
            <rect x="0" y="17" rx="4" ry="4" width="100%" height="12" />
            <rect x="0" y="34" rx="4" ry="4" width="100%" height="12" />
            <rect x="0" y="51" rx="4" ry="4" width="100%" height="12" />
            <rect x="0" y="68" rx="4" ry="4" width="100%" height="12" />

          </ContentLoader>
        </div>
      ) : (
        <>
          <TableContainer
            sx={{ mt: 2, background: "rgba(28,28,28,0.51)" }}
            component={Paper}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Edad</TableCell>
                  <TableCell align="right">Genero Musical</TableCell>
                  {/* <TableCell align="right">Avatar</TableCell> */}
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {singers.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.age}</TableCell>
                    <TableCell align="right">{row.gender}</TableCell>
                    {/* <TableCell align="right">{row.avatar}</TableCell> */}
                    <TableCell align="right">
                      <TableMenu singer={row} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <ModalManageSinger />
        </>
      )}
    </main>
  );
}
```
