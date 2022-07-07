import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Youtube from './youtube';

const Map = ({navigation}) => {
  const rows = [
    {id: 1, numSeats: 5, shifted: true},
    {id: 2, numSeats: 5, shifted: false},
  ];
  const number = [1, 2, 3, 4, 5];
  const machines = [
    {id: 1, name: '왼쪽', url: 'https://www.youtube.com/watch?v=Wt8jFu0cH5M'},
    {id: 2, name: '벤치 ', url: 'https://gamil.com'},
    {id: 3, name: '데드', url: 'https://youtube.com'},
    {id: 4, name: '스쿼트', url: 'https://google.com'},
    {id: 5, name: '스쿼트', url: 'https://google.com'},
  ];
  const machines2 = [
    {id: 11, name: '오른쪽', url: 'https://naver.com'},
    {id: 12, name: '벤치 ', url: 'https://gamil.com'},
    {id: 13, name: '데드', url: 'https://youtube.com'},
    {id: 14, name: '스쿼트', url: 'https://google.com'},
    {id: 15, name: '스쿼트', url: 'https://google.com'},
  ];
  const free_weights = [
    {id: 21, name: '프리', url: 'https://naver.com'},
    {id: 22, name: '웨이트 ', url: 'https://gamil.com'},
    {id: 23, name: '스미스', url: 'https://youtube.com'},
    {id: 24, name: '머신', url: 'https://google.com'},
  ];
  return (
    <View style={{flex: 1}}>
      {/* 싸이클 있는 부분 */}
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View style={{padding: 20, flexDirection: 'row'}}>
          {rows.map(row => {
            return (
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {Array(row.numSeats)
                  .fill(null)
                  .map(() => {
                    return (
                      <View
                        style={{
                          flexDirection: 'column',
                          width: 30,
                          height: 30,
                          backgroundColor: '#d2d2d2',
                          margin: 5,
                        }}
                      />
                    );
                  })}
              </View>
            );
          })}
        </View>
      </View>

      {/* 러닝머신 있는 부분 */}
      <View
        style={{
          padding: 20,
          justifyContent: 'flex-end',
          alignSelf: 'flex-end',
          position: 'absolute',
        }}>
        {rows.map(row => {
          return (
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {Array(row.numSeats)
                .fill(null)
                .map(() => {
                  return (
                    <View
                      style={{
                        flexDirection: 'column',
                        width: 30,
                        height: 30,
                        backgroundColor: '#d2d2d2',
                        margin: 5,
                      }}
                    />
                  );
                })}
            </View>
          );
        })}
      </View>

      {/* 가운데 기구들  */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignSelf: 'center',
        }}>
        <View>
          {machines.map(machine => {
            return Array(machine)
              .fill(machine)
              .map(() => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Youtube', {
                        url: machine.url,
                      })
                    }
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: '#93DAFF',
                      margin: 5,
                      justifyContent: 'center',
                    }}>
                    <Text style={{textAlign: 'center'}}>{machine.name}</Text>
                  </TouchableOpacity>
                );
              });
          })}
        </View>

        <View>
          {machines2.map(machine2 => {
            return Array(machine2)
              .fill(machine2)
              .map(() => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Youtube', {
                        url: machine2.url,
                      })
                    }
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: '#93DAFF',
                      margin: 5,
                      justifyContent: 'center',
                    }}>
                    <Text style={{textAlign: 'center'}}>{machine2.name}</Text>
                  </TouchableOpacity>
                );
              });
          })}
        </View>
      </View>
      {/* 프리웨이트 부분 */}
      <View style={{position: 'absolute', bottom: 0}}>
        {free_weights.map(free_weight => {
          return Array(free_weight)
            .fill(free_weight)
            .map(() => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Youtube', {
                      url: free_weight.url,
                    })
                  }
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#93DAFF',
                    margin: 15,
                    justifyContent: 'center',
                  }}>
                  <Text style={{textAlign: 'center'}}>{free_weight.name}</Text>
                </TouchableOpacity>
              );
            });
        })}
      </View>
    </View>
  );
};

export default Map;
