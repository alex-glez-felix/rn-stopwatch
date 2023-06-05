import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';
import moment from 'moment/moment';

function formatTime(time) {
  const momentTime = moment.duration(time);
  const hours = momentTime.hours().toString().padStart(2, '0');
  const minutes = momentTime.minutes().toString().padStart(2, '0');
  const seconds = momentTime.seconds().toString().padStart(2, '0');
  const milliseconds = momentTime.milliseconds().toString().padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export default function App() {
  const [running, setRunning] = useState(false);
  const [start, setStart] = useState(200);
  const [now, setNow] = useState(1300);
  const [laps, setLaps] = useState([500, 778, 1074]);
  const [timer, setTimer] = useState(null);

  function handleStart() {
    if (running) {
      clearInterval(timer);
      setRunning(false);
    } else {
      setRunning(true);
      setStart(Date.now());
      setNow(Date.now());
      setTimer(setInterval(() => setNow(Date.now()), 100));
    }
  }

  function handleRestart() {
    const now = Date.now();
    setStart(now);
    setNow(now);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(now - start)}</Text>
      <StatusBar style='auto' />

      {/* Botones */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          marginBottom: 80,
        }}
      >
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>{running ? 'Detener' : 'Iniciar'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRestart}>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Vuelta</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de vueltas */}
      <View style={styles.lapsContainer}>
        <FlatList
          data={laps}
          renderItem={({ item, index }) => (
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.lapsText}>{index + 1}</Text>
              <Text style={styles.lapsText}>
                {index === 0
                  ? formatTime(item)
                  : formatTime(item - laps[index - 1])}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  timerText: {
    color: '#fff',
    fontSize: 50,
    marginBottom: 150,
  },
  button: {
    backgroundColor: '#bbb',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
  lapsContainer: {
    width: '100%',
    height: '30%',
    backgroundColor: '#888',
  },
  lapsText: {
    color: '#000',
    fontSize: 20,
    padding: 10,
  },
});
