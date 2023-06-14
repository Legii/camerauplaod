import { ScrollView, View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import FotoItem from './FotoItem'
import styles from '../assets/styles'
import { StatusBar } from 'react-native'
import { PageScrollView } from "pagescrollview"
const FlatList = (props: any) => {

  return (


    <PageScrollView style={styles.grid} >
      {

        props.images.map((e: any, ind: number) => (

          <FotoItem
            nav={props.nav}
            key={ind}
            ind={ind}
            id={e.id}
            uri={e.uri}
            e={e}
            selectHandler={props.selectHandler}
            isSelected={props.selected.includes(e.uri)}
            width={props.layout == "grid" ? props.size : "100%"}
            height={props.layout == "grid" ? props.size : props.size / 2}

          // height={props.layout == "grid" ? props.size : e.height / e.width * props.size}
          />





        )
        )
      }
    </PageScrollView>
  )
}
// <FotoItem key={ind} ind={ind} uri={e.uri} selectHandler={props.selectHandler} width={"100%"} height={e.width / e.height * props.size} />
export default FlatList