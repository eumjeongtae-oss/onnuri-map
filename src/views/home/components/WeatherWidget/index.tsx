import { useGeolocation } from '@/hooks/useGeolocation';
import { useCurrentWeather } from '@/hooks/queries/useWeatherQueries';
import * as styles from './WeatherWidget.css';

export function WeatherWidget() {
  const { coords } = useGeolocation();
  const { data: weather } = useCurrentWeather(coords);

  if (!weather) return null;

  const temp = Math.round(weather.main.temp);
  const icon = weather.weather[0]?.icon;
  const desc = weather.weather[0]?.description;

  return (
    <div className={styles.widget}>
      {icon && (
        <img
          src={`https://openweathermap.org/img/wn/${icon}.png`}
          alt={desc}
          width={32}
          height={32}
        />
      )}
      <span className={styles.temp}>{temp}°C</span>
      <span className={styles.desc}>{desc}</span>
    </div>
  );
}
