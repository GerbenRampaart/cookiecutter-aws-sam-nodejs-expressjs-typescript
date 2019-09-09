const defaultPort = 3000;

export enum Mode {
  DEV, PRD
}

export interface Environment {
  apollo: {
    introspection: boolean;
    playground: boolean;
    debug: boolean;
    tracing: boolean;
  };
  port: number;
  mode: Mode;
}

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true',
    debug: process.env.APOLLO_DEBUG === 'true',
    tracing: process.env.APOLLO_TRACING === 'true'
  },
  port: process.env.PORT !== undefined ? Number(process.env.PORT) : defaultPort,
  mode: process.env.NODE_ENV === "production" ? Mode.PRD : Mode.DEV
};
