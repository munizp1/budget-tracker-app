'use client'
import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import {Model} from "../../components/modeldata.js"
import { Canvas,useLoader } from "@react-three/fiber";
import {Suspense} from 'react'
import THREE from "three";
import {OrbitControls, Text} from '@react-three/drei'





  




export default function Productoverview() {
  

  return (
    
    
        <div className="py-20 lg:col-span-32 lg:col-start-1 lg:border-r lg:border-gray-800 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div className="card">
            <div className="product-canvas-intro">
                   <Canvas>
                      <Suspense fallback={null}>
                          <ambientLight/>
                          <ambientLight/>
                          <pointLight position={[10, 10, 10]} />
                          <pointLight position={[10, 10, 10]} />
                          <pointLight position={[10, 10, 10]} />
                          <pointLight position={[10, 10, 10]} />
                          <pointLight position={[10, 10, 10]} />
                          <pointLight position={[10, 10, 10]} />
                          <pointLight position={[10, 10, 10]} />

                          

                          
                          <spotLight intensity={0.9} 
                                     angle={0.1} 
                                     penumbra={1} 
                                     position={[10,15,10]}
                                     //castShadow  
                                     />
                          <directionalLight position={[0, 2, 0]}/>  
                          <directionalLight position={[0, -2, 0]}/>          
                          <Model position={[-0.5, 0,0]} rotation={[1.57,-1.57, 0]}/>
                          <Text
                color="black"
                fontSize={0.1}
                position={[-0.5, -0.4, 0.03]} // Adjust position as needed
                rotation={[0, 0, 0]} // Adjust rotation as needed
                textAlign="center"
              >
                Christopher Soria  
              </Text>
                          
                          <OrbitControls enablePan={true}
                                         enableZoom={true}
                                         enableRotate={true}/>
                      </Suspense>
                      
                   </Canvas>
                </div>    
                </div> 
            
          </div>

        
      
  )
}