function Withdraw(){
  const [balance, setBalance] = React.useState(300);
  const [withdraw, setWithdraw] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [submitDisabled, setSubmitDisabled] = React.useState(true);

  React.useEffect(() => {
    if(!withdraw) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [withdraw]);

  const validate = amount => {
    if(!amount) {
      setStatus('Error: Please enter a value');
      return false;
    }
    if(amount < 0) {
      setStatus("Error: Attempting to withdraw a negative number");
      return false;
    }
    if(!Number(amount)) {
      setStatus('Error: Please enter a valid number');
      return false;
    }
    if(balance - amount < 0) {
      setStatus('Error: Attempting to withdrawal more money than you have');
      return false;
    }
    return true;
  }

  const withdrawMoney = amount => {
    if (!validate(amount)) return;
    setBalance(balance - Number(amount));
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
                withdraw<br/>
                <input type="input" className="form-control" id="withdraw" placeholder="Enter withdraw" value={withdraw} onChange={e => {setWithdraw(e.currentTarget.value)}} /><br/>
                <button type="submit" className="btn btn-light" onClick={() => withdrawMoney(withdraw)} disabled={submitDisabled}>withdraw</button>
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
