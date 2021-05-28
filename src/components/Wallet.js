import React from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const Wallet = () => {
  const { user, balance } = useAuth();
  return (
    <div>
      <h1>{user}</h1>
      <h2>{balance}</h2>
      <Button>Deposit</Button>
      <Button>Withdraw</Button>
    </div>
  );
};

export default Wallet;
