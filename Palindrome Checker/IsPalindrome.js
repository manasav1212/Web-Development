function reverse(str)
{
    let reverseStr = "";
    for(let i = str.length - 1; i >= 0; i--)
    {
        reverseStr += str[i]
    }
    return reverseStr;
}

function isPalindrome(str)
{
    if(str === reverse(str))
        return true;
    else
        return false;
}

function showAlert(msg)
{
    alert(msg);
}

function checkPalindrome()
{
    let str = document.getElementById("string").value.trim();
    if(isPalindrome(str))
        showAlert("Given string is a palindrome");
    else
        showAlert("Given string is not a palindrome");
    document.getElementById("string").value = "";
}