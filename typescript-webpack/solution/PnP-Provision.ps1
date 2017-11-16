#===================================================================================
#
# This is the main entry point for the deployment process
#
#===================================================================================

param(
	[Parameter(Mandatory = $true, HelpMessage="Enter the URL of the target site, e.g. 'https://intranet.mydomain.com/sites/targetSite'")]
    [String]
    $targetSiteUrl,

    [Parameter(Mandatory = $false, HelpMessage="Serve assets from localhost, default is false")]
    [Bool]
    $serveLocal,

    [Parameter(Mandatory = $false, HelpMessage="Is publishing enabled? Default is true")]
    [Bool]
    $publishing,

	[Parameter(Mandatory = $false, HelpMessage="Optional administration credentials")]
    [PSCredential]
    $Credentials
)


#===================================================================================
# Func: Get-ScriptDirectory
# Desc: Get the script directory from variable
#===================================================================================
function Get-ScriptDirectory
{
  $Invocation = (Get-Variable MyInvocation -Scope 1).Value
  Split-Path $Invocation.MyCommand.Path
}

#===================================================================================
# Set current script location
#===================================================================================
$currentDir = Get-ScriptDirectory
Set-Location -Path $currentDir

#===================================================================================
# Verify Credentials
#===================================================================================
if($Credentials -eq $null)
{
	$Credentials = Get-Credential -Message "Enter Admin Credentials"
}

#===================================================================================
# Verify if serving assets locally for local dev - default to false
#===================================================================================
if ($serveLocal -ne $true)
{
	$serveLocal = $false
}

#===================================================================================
# Installing to site with publishing enabled? default is true
#===================================================================================
if ($publishing -eq $null)
{
	$publishing = $true
}

#===================================================================================
# Confirm the environment
#===================================================================================
Write-Host -ForegroundColor Cyan "		SharePoint site collection URL: " -nonewline; Write-Host -ForegroundColor White $targetSiteUrl
Write-Host ""

Write-Host -ForegroundColor White "--------------------------------------------------------"
Write-Host -ForegroundColor White "|                      Provision                       |"
Write-Host -ForegroundColor White "--------------------------------------------------------"

Write-Host -ForegroundColor Yellow "Target Site URL: $targetSiteUrl"

try
{
    #Set default variables values
	$rootPath = $targetSiteUrl.Substring($targetSiteUrl.IndexOf('/',8))

    Connect-PnPOnline $targetSiteUrl -Credentials $Credentials

    #if we are to be serving branding assets locally for now, no reason to provision, just set
	if ($serveLocal)
	{
		Write-Host -ForegroundColor White "Not provisioning branding assets - expecting local development hosting"

		#change root path to local host
		$rootPath = "https://localhost:3000"
	}
	else
	{
		Write-Host -ForegroundColor White "Provisioning asset files to $($targetSiteUrl)"
        
		if ($publishing -eq $true)
        {
            Apply-PnPProvisioningTemplate -Path .\templates\root-publishing.xml
        }
        else
        {
            Apply-PnPProvisioningTemplate -Path .\templates\root.xml
        }
	}

    #Embed JavaScript using custom action
	Write-Host ""
	Write-Host -ForegroundColor White "Setting Custom Action to Embed JavaScript"

	Apply-PnPProvisioningTemplate -Path .\templates\Custom.Template.xml -Handlers CustomActions,Features -Parameters @{"InfrastructureSiteUrl"=$rootPath}

    Write-Host -ForegroundColor Green "Provisioning complete"
}
catch
{
    Write-Host -ForegroundColor Red "Exception occurred!" 
    Write-Host -ForegroundColor Red "Exception Type: $($_.Exception.GetType().FullName)"
    Write-Host -ForegroundColor Red "Exception Message: $($_.Exception.Message)"
}