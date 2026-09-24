import React from "react";
import {Text,View} from "react-native";import {router} from "expo-router";
import {C} from "../constants/palette";
import {Page,Header,Card,Button,Heading,Item} from "../components/Kit";
export default function AdminHome(){return <Page>
  <Header title="Admin overview" sub="Campus property reporting"/>
<Card style={{backgroundColor:C.maroon,borderColor:C.maroon}}>
  <Text style={{color:"#F8E9EE",fontWeight:"700",fontSize:12}}>CAMPUS OPERATIONS</Text>
  <Text style={{color:"#fff",fontSize:22,fontWeight:"900"}}>Reports at a glance</Text>
  <Text style={{color:"#F8E9EE"}}>Review new issues and monitor repair activity.</Text>
  <Button title="Open campus map" outline onPress={()=>router.push("/admin-campus-map" as any)}/>
</Card>
<View style={{flexDirection:"row",flexWrap:"wrap",gap:9}}>
  {[
    ["24","Total reports"],
    ["6","Pending review"],
    ["9","In progress"],
    ["9","Completed"]
  ].map(([n,t]) => (
    <Card key={t} style={{width:"48%",gap:3}}>
      <Text style={{color:C.maroon,fontSize:24,fontWeight:"900"}}>{n}</Text>
      <Text style={{color:C.muted,fontSize:12}}>{t}</Text>
    </Card>
  ))}
</View>
<Heading>Needs review</Heading>
<Card>
  <Item 
    title="Water leak near sink" 
    meta="UM-2026-0014 · Building 1 / Room 101" 
    status="PENDING" 
    onPress={()=>router.push("/admin-reports" as any)}
  />
  <Item 
    title="Damaged lab stool" 
    meta="UM-2026-0013 · Physics Lab" 
    status="PENDING" 
    onPress={()=>router.push("/admin-reports" as any)}
  />
</Card>
<Card>
  {[
    ["All reports","/admin-reports"],
    ["User management","/admin-users"],
    ["Complaints","/admin-complaints"],
    ["Settings","/admin-settings"],
    ["Log out","/"]
  ].map(([t,r]) => (
    <Text 
      key={r} 
      onPress={()=>router.push(r as any)} 
      style={{paddingVertical:10,color:C.maroon,fontWeight:"700"}}
    >
      {t}  ›
    </Text>
  ))}
</Card>
</Page>}