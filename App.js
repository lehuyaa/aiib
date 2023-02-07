/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import Video from 'react-native-video';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';

const Item = ({title, onClick}) => (
  <TouchableOpacity onPress={onClick} style={styles.item}>
    <Text style={styles.titleItem}>{title} </Text>
    {/* <Image
      style={styles.arrow}
      source={require('./assets/black-arrow.png')}
      resizeMode="contain"
    /> */}
  </TouchableOpacity>
);

const ItemImage = ({title, onClick, choose}) => (
  <TouchableOpacity onPress={onClick} style={styles.item}>
    <View style={{backgroundColor: '#8D1A1F', padding: 10, marginRight: 10}}>
      <Image
        style={styles.arrow}
        source={require('./assets/left-arrow.png')}
        resizeMode="contain"
      />
    </View>
    <Text style={[styles.titleItem, {color: choose ? '#8D1A1F' : 'black'}]}>
      {title}
    </Text>
    <Image
      style={styles.arrow}
      source={require('./assets/black-arrow.png')}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

const body = (
  listVideo,
  listFolder2,
  listFolder,
  listAIIB,
  onClickVideo,
  onClickFolder2,
  onClickFolder,
  onClickYear,
  chooseImage,
) => {
  if (listVideo.length) {
    return (
      <FlatList
        data={listVideo}
        renderItem={({item}) => (
          <ItemImage
            title={item.name}
            onClick={() => onClickVideo(item.url)}
            choose={chooseImage === item.url}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  }
  if (listFolder2.length) {
    return (
      <FlatList
        data={listFolder2}
        renderItem={({item}) => (
          <Item
            title={item.name}
            onClick={() => onClickFolder2(item.name, item.children)}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  }

  if (listFolder.length) {
    return (
      <FlatList
        data={listFolder}
        renderItem={({item}) => (
          <Item
            title={item.name}
            onClick={() => onClickFolder(item.name, item.children)}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  }

  if (listAIIB.length) {
    return (
      <FlatList
        data={listAIIB}
        renderItem={({item}) => (
          <Item
            title={item.name}
            onClick={() => onClickYear(item.name, item.children)}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  }
};

function App() {
  const [listAIIB, setListAIIB] = useState([]);
  const [listFolder, setListFolder] = useState([]);
  const [listFolder2, setListFolder2] = useState([]);
  const [listVideo, setListVideo] = useState([]);

  const [yearAIIB, setYearAIIB] = useState('');
  const [folder, setFolder] = useState('');
  const [folder2, setFolder2] = useState('');

  const [chooseImage, setChooseImage] = useState('');

  const [loading, setLoading] = useState(false);

  const getList = async () => {
    setYearAIIB('');
    setFolder('');
    setFolder2('');
    setListVideo([]);
    setListFolder([]);
    setListFolder2([]);
    setLoading(true);
    axios
      .get(
        'https://aiibar.shadowfactory.io/api/archivefolders?recurse=1&fbclid=IwAR34ve51uHgO6R0rFRVLP29q4o0V2Lv5eD--x8VHMpHMewil-x7JjJgqeIw',
      )
      .then(function (response) {
        setListAIIB(response.data.children || []);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  };

  const onClickYear = (name, list) => {
    setYearAIIB(name);
    setListFolder(list);
  };

  const onClickFolder = (name, list) => {
    setFolder(name);
    setListFolder2(list);
  };
  const onClickFolder2 = (name, list) => {
    setFolder2(name);
    setListVideo(list);
  };
  const onClickImage = url => {
    setChooseImage(url);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <Text style={styles.title}>AIIB ARCHIVE</Text>
          <Image
            style={styles.arrow}
            source={require('./assets/left-arrow.png')}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => {
              setListVideo([]);
              setListFolder([]);
              setListFolder2([]);
              setYearAIIB('');
              setFolder('');
              setFolder2('');
              setChooseImage('');
            }}
            style={{flexDirection: 'row'}}>
            <Text style={styles.title}>GREEN INFRASTRUCTURE</Text>
          </TouchableOpacity>
          {yearAIIB && (
            <TouchableOpacity
              onPress={() => {
                setListFolder([]);
                setListFolder2([]);
                setListVideo([]);
                setFolder('');
                setFolder2('');
                setChooseImage('');
              }}
              style={{flexDirection: 'row'}}>
              <Image
                style={styles.arrow}
                source={require('./assets/left-arrow.png')}
                resizeMode="contain"
              />
              <Text style={styles.title}>{yearAIIB}</Text>
            </TouchableOpacity>
          )}
          {folder && (
            <TouchableOpacity
              onPress={() => {
                setListFolder2([]);
                setFolder2('');
                setListVideo([]);
                setChooseImage('');
              }}
              style={{
                flexDirection: 'row',
                maxWidth: '20%',
              }}>
              <Image
                style={styles.arrow}
                source={require('./assets/left-arrow.png')}
                resizeMode="contain"
              />
              <Text numberOfLines={1} style={[styles.title, {maxWidth: '80%'}]}>
                {folder}
              </Text>
            </TouchableOpacity>
          )}
          {folder2 && (
            <TouchableOpacity
              onPress={() => {
                setListVideo([]);
                setChooseImage('');
              }}
              style={{flexDirection: 'row'}}>
              <Image
                style={styles.arrow}
                source={require('./assets/left-arrow.png')}
                resizeMode="contain"
              />
              <Text numberOfLines={1} style={[styles.title, {maxWidth: '30%'}]}>
                {folder2}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.body}>
          <View style={[styles.triangle, styles.triangleCornerBottomLeft]} />
          {loading ? (
            <View style={[styles.loading]}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            body(
              listVideo,
              listFolder2,
              listFolder,
              listAIIB,
              onClickImage,
              onClickFolder2,
              onClickFolder,
              onClickYear,
              chooseImage,
            )
          )}
          <View
            style={{
              width: '52%',
              height: '85%',
              position: 'absolute',
              top: '7.5%',
              right: '5%',
              backgroundColor: 'white',
              borderWidth: 10,
              borderColor: 'white',
            }}>
            {!chooseImage && <View style={styles.wrapContainer} />}
            {chooseImage.includes('jpg' || 'png') || !chooseImage ? (
              <Image
                style={styles.mainImage}
                source={
                  chooseImage
                    ? {uri: chooseImage}
                    : require('./assets/defaultImage.png')
                }
                resizeMode="cover"
              />
            ) : (
              <Video
                controls
                source={{
                  uri: 'https://wowza.jwplayer.com/live/jelly.stream/playlist.m3u8',
                }} // Can be a URL or a local file.
                style={styles.backgroundVideo}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '100%',
  },
  mainContent: {
    backgroundColor: '#8D1A1F',
    height: '100%',
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 25,
    flexDirection: 'row',
    height: '8%',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
  arrow: {
    height: 12,
    width: 12,
    paddingHorizontal: 10,
  },
  body: {
    backgroundColor: 'white',
    height: '92%',
  },
  triangle: {
    width: '45%',
    height: '92%',
    borderBottomWidth: 306,
    borderBottomColor: '#8D1A1F',
    borderLeftWidth: 0,
    borderLeftColor: 'transparent',
    borderRightWidth: 140,
    borderRightColor: 'transparent',
    borderStyle: 'solid',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
  triangleCornerBottomLeft: {
    transform: [{rotate: '180deg'}],
  },
  item: {
    padding: 10,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  titleItem: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 16,
    width: '70%',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderColor: 'white',
    borderWidth: 10,
  },
  wrapContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  square: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 13,
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default App;
