//inspired from: https://github.com/giuleon/spfxWeather/
//uses weather api from: https://www.apixu.com/

import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';

import styles from './HelloWorld.module.scss';
import { IHelloWorldWebPartProps } from '../IHelloWorldWebPartProps';

export interface IWeatherProps extends IHelloWorldWebPartProps {
  basicHttpClient: HttpClient;
  weatherApiKey: string;
}

export interface IWeatherState {
  status: string;
  items: IListItem[];
  temp: string;
}

export interface IListItem {
    location?: {
        "name": string,
        "region": string,
        "country": string,
        "lat": string,
        "lon": string,
        "tz_id": string,
        "localtime_epoch": string,
        "localtime": string
    };
    current?: {
        "last_updated_epoch": string,
        "last_updated": string,
        "temp_c": string,
        "temp_f": string,
        "is_day": string,
        "condition": {
            "text": string,
            "icon": string,
            "code": string
        },
        "wind_mph": string,
        "wind_kph": string,
        "wind_degree": string,
        "wind_dir": string,
        "pressure_mb": string,
        "pressure_in": string,
        "precip_mm": string,
        "precip_in": string,
        "humidity": string,
        "cloud": string,
        "feelslike_c": string,
        "feelslike_f": string,
        "vis_km": string,
        "vis_miles": string
    };
}

export default class Weather extends React.Component<IWeatherProps, IWeatherState> {
  constructor(props: IWeatherProps, state: IWeatherState) {
    super(props);

    this.state = {
      status: this.listNotConfigured(this.props) ? 'Please configure list in Web Part properties' : 'Ready',
      items: [],
      temp: ""
    };
  }

  public componentWillReceiveProps(nextProps: IWeatherProps): void {
    this.getWeatherCondition({location: nextProps.description, apiKey: nextProps.weatherApiKey});
  }
  
  public render(): JSX.Element {
    const items: JSX.Element[] = this.state.items.map((item: IListItem, i: number): JSX.Element => {
        return (
          <div key={item.location.name} className='ms-bgColor-neutralSecondary'>
            <img className={css(styles.topWeather)} src={item.current.condition.icon}/>
            <span className='ms-font-xxl ms-fontColor-neutralLight'>{item.location.name}: {this.state.temp}&deg;F - {item.current.condition.text}</span>
          </div>
        );
    });

    return (
      <div className={styles.weather}>
        <div className={styles.container}>
          <div className={css(styles.weatherContainer)} style={{backgroundImage: `url('http://loremflickr.com/700/300/${this.props.description}')`}}>
            <div className='ms-Grid-col ms-u-lg12 ms-u-xl12'>
              {items}
            </div>
          </div>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    console.log("componentDidMount!!");
    this.getWeatherCondition({location: this.props.description, apiKey: this.props.weatherApiKey});
  }

  private getWeatherCondition(options : any): void {
    var loc = options.location;
    var apiKey = options.apiKey;
    var httpClientOptions : IHttpClientOptions = {};

    httpClientOptions.headers = {
        'Accept': 'application/json;odata=nometadata'
    };

    this.props.basicHttpClient.get(`https://api.apixu.com/v1/current.json?q=${loc}&key=${apiKey}`,
        HttpClient.configurations.v1,
        httpClientOptions
        )
        .then((response: HttpClientResponse): Promise<{ weather: IListItem }> => {
            return response.json();
        })
        .then((response: IListItem): void => {
            this.setState({
                status: `Successfully loaded ${response} items`,
                items: [response],
                temp: response.current.temp_f
            });
            }, (error: any): void => {
            this.setState({
                status: 'Loading all items failed with error: ' + error,
                items: [],
                temp: ""
            });
        });
  }

  private listNotConfigured(props: IWeatherProps): boolean {
    return props.description === undefined ||
      props.description === null ||
      props.description.length === 0 ||
      props.weatherApiKey === undefined ||
      props.weatherApiKey === null ||
      props.weatherApiKey.length === 0;
  }
}