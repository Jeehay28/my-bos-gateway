import React from 'react';
import { firebaseAuth } from '../utils/firebase';
import { parseURLParams } from '../utils/generic';
import { sendSignInLinkToEmail } from 'firebase/auth';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const VerifyEmail = () => {
    const history = useHistory();
    const [urlParams, setUrlParams] = React.useState(null);


    const handleResendEmail = async (data) => {
        if (!urlParams?.accountId || !urlParams.email || !urlParams.publicKey) return

        try {
            if (!!urlParams.publicKey) {
                await sendSignInLinkToEmail(firebaseAuth, urlParams.email, {
                    url: `${window.location.origin}/auth-callback?publicKey=${urlParams.publicKey}&accountId=${urlParams.accountId}`,
                    handleCodeInApp: true,
                })
                alert('Email sent')
            }
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    };

    React.useEffect(() => {
        const params = parseURLParams(window.location.search)
        setUrlParams(params)
    }, [window.location.search])

    return (
        <StyledContainer>
            <FormContainer onSubmit={handleResendEmail}>
                <header>
                    <a href="/signup" style={{ textDecoration: 'underline', color: 'black' }}><small>Go back</small></a>
                    <h1 style={{ marginTop: '12px' }}>Verify your email</h1>
                    <p style={{ fontWeight: 600, marginTop: '12px' }}>{urlParams?.email}</p>
                </header>

                <p>Check your inbox to activate your account.</p>

                <StyledButton fullWidth onClick={handleResendEmail} type="button">
                    Resend Email
                </StyledButton>
            </FormContainer>
        </StyledContainer>
    )
}

export default VerifyEmail


const StyledContainer = styled.div`
  width: 100%;
  height: calc(100vh - 66px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F2F1EA;
  padding: 0 16px;
`

const FormContainer = styled.form`
  max-width: 450px;
  width: 100%;
  margin: 16px auto;
  background-color: #FFFFFF;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const StyledButton = styled.button`
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  margin-top: 4px;
  min-height: 40px;
  cursor: pointer;
  background-color: #6BE89E;
  color: #000000;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:focus {
    outline: none;
  }
`