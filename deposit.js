function Deposit(){
  const [balance, setBalance] = React.useState(300);
  const [deposit, setDeposit] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [submitDisabled, setSubmitDisabled] = React.useState(true);

  React.useEffect(() => {
    if(!deposit) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [deposit]);

  const validate = amount => {
    if(!amount) {
      setStatus('Error: Please enter a value');
      return false;
    }
    if(amount < 0) {
      setStatus("Error: Attempting to deposit a negative number");
      return false;
    }
    if(!Number(amount)) {
      setStatus('Error: Please enter a valid number');
      return false;
    }
    return true;
  }

  const depositMoney = amount => {
    if (!validate(amount)) return;
    setBalance(Number(balance) + Number(amount));
    setSuccess(true);
  }

  return !success ? (

      <Card
        bgcolor="primary"
        header="Create Account"
        status={status}
        body={(  
                <>
                <h3>
                  Balance: {balance}
                </h3>
                Deposit<br/>
                <input type="input" className="form-control" id="deposit" placeholder="Enter Deposit" value={deposit} onChange={e => {setDeposit(e.currentTarget.value)}} /><br/>
                <button type="submit" className="btn btn-light" onClick={() => depositMoney(deposit)} disabled={submitDisabled}>Deposit</button>
                </>
              )}
      />
    ) : (
      <>
        <h3>Success</h3>
        <h4>Current balance: {balance}</h4>
      </>
    );
}
