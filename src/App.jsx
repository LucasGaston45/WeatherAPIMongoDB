import { useState } from 'react';
import axios from 'axios';

function App() {
  const [datos, setDatos] = useState({});
  const [ubicacion, setUbicacion] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ubicacion}&units=imperial&appid=f3681c4ce3cb50738d6ceada123aec95`;

  const buscarUbicacion = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setDatos(response.data);
        console.log(response.data);
        guardarBusqueda(ubicacion);
      });
      setUbicacion('');
    }
  };

  const guardarBusqueda = (ubicacion) => {
    axios.post('http://localhost:5000/api/historialBusqueda', { location: ubicacion })
      .then(response => {
        console.log('Historial guardado:', response.data);
      })
      .catch(error => {
        console.error('Error guardando el historial:', error);
      });
  };

  const convertirFahrenheitAGrados = (tempF) => {
    return ((tempF - 32) * 5 / 9).toFixed(2);
  };

  return (
    <>
      <div className='app'>
        <div className="busqueda">
          <input type="text"
            value={ubicacion}
            onChange={event => setUbicacion(event.target.value)}
            onKeyDown={buscarUbicacion}
            placeholder='Ingresar Ubicación'
          />
        </div>
        <div className="contenedor">
          <div className="superior">
            <div className="ubicacion">
              <p>{datos.name}</p>
            </div>
            <div className="temperatura">
              {datos.main ? <h1>{convertirFahrenheitAGrados(datos.main.temp)}°C</h1> : null}
            </div>
            <div className="descripcion">
              {datos.weather ? <p>{datos.weather[0].main}</p> : null}
            </div>
          </div>

          {datos.name !== undefined &&
            <div className="inferior">
              <div className="sensacion">
                {datos.main ? <p className='negrita'>{convertirFahrenheitAGrados(datos.main.feels_like)}°C</p> : null}
                <p>Sensación Térmica</p>
              </div>
              <div className="humedad">
                {datos.main ? <p>{datos.main.humidity}%</p> : null}
                <p>Humedad</p>
              </div>
              <div className="viento">
                {datos.wind ? <p>{datos.wind.speed}MPH</p> : null}
                <p>Velocidad del Viento</p>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default App;