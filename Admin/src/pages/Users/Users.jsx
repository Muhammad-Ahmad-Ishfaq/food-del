import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
// import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

function Users() {
  const [user, setUser] = useState([]);
  useEffect(function(){
    axios
    .get("https://food-del-backend-zeta.vercel.app/api/user/all-users", {
                  // automatically send cookies
                  withCredentials: true,    
                  headers: { "Content-Type": "application/json" },
                })
    .then(function(result){
    //   console.log(result?.data?.user);
      setUser(result?.data?.user)
    })
    .catch(function(error){
      console.log(error)
    })
  }, [])
  return (
    <>
      <Card className='w-full'>
        <CardHeader>
        <div className="flex justify-between items-center">
        <CardTitle className="font-semibold md:text-2xl">Users</CardTitle>
      </div>
          <CardDescription>
            A user is a casual name given to an individual who interacts with a
            website, online service, app or platform in any way.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Card>
            <Table>
                  <TableHeader>
                  <TableRow>
                    <TableHead>Sr.No</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead>User Email</TableHead>
                    <TableHead>User Role</TableHead>
                    <TableHead>Date</TableHead>
                    {/* <TableHead>Actions</TableHead> */}
                  </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user?.map(function(users, index){
                      return (
                          <TableRow key={users._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{users.name}</TableCell>
                    <TableCell>{users.email}</TableCell>
                    <TableCell>{users.role}</TableCell>
                    <TableCell>{moment(users.createdAt).format("DD-MM-YYYY")}</TableCell>
                    {/* <TableCell>
                      <Button variant="link">Edit</Button>
                      <Button variant="link">Delete</Button>
                    </TableCell> */}
                  </TableRow>
                      )
                    })}        
                  </TableBody>
            </Table>
            </Card>
        </CardContent>
      </Card>
    </>
  );
}

export default Users;


