interface ClientConfig {
  theme: {
    [themeName: string]: Theme;
  };
}

interface Theme {
  primaryColor: string;
  primaryTextColor: string;
  backgroundImage: string;
  aero: boolean;
}

const config: ClientConfig = {
  theme: {
    default: {
      primaryColor: '74, 144, 226',
      primaryTextColor: '247, 247, 247',
      backgroundImage: '',
      aero: false
    }
  }
}

export default config;
