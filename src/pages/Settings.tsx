
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set page title
    document.title = "Settings | TransMatch Guardian";
  }, []);

  const handleSaveSettings = (section: string) => {
    toast({
      title: `${section} Settings Saved`,
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <PageLayout title="Settings" description="Configure application settings">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">
          Configure application settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your account and application preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input id="company_name" defaultValue="Acme Corporation" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="display_name">Display Name</Label>
                    <Input id="display_name" defaultValue="Admin User" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="admin@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="UTC-8"
                    >
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                      <option value="UTC+1">Central European Time (UTC+1)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Application Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark_mode">Dark Mode</Label>
                      <p className="text-xs text-muted-foreground">
                        Enable dark mode for the application
                      </p>
                    </div>
                    <Switch id="dark_mode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact_view">Compact View</Label>
                      <p className="text-xs text-muted-foreground">
                        Display more information in less space
                      </p>
                    </div>
                    <Switch id="compact_view" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("General")}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email_alerts">Fraud Alerts</Label>
                      <p className="text-xs text-muted-foreground">
                        Receive email notifications for new fraud alerts
                      </p>
                    </div>
                    <Switch id="email_alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email_reports">Weekly Reports</Label>
                      <p className="text-xs text-muted-foreground">
                        Receive weekly summary reports via email
                      </p>
                    </div>
                    <Switch id="email_reports" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email_tasks">Task Assignments</Label>
                      <p className="text-xs text-muted-foreground">
                        Get notified when tasks are assigned to you
                      </p>
                    </div>
                    <Switch id="email_tasks" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">In-App Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app_alerts">System Alerts</Label>
                      <p className="text-xs text-muted-foreground">
                        Show in-app notifications for system alerts
                      </p>
                    </div>
                    <Switch id="app_alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app_mentions">Task Updates</Label>
                      <p className="text-xs text-muted-foreground">
                        Show notifications for task updates
                      </p>
                    </div>
                    <Switch id="app_mentions" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("Notification")}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current_password">Current Password</Label>
                    <Input id="current_password" type="password" />
                  </div>
                  <div></div>
                  <div className="space-y-2">
                    <Label htmlFor="new_password">New Password</Label>
                    <Input id="new_password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm_password">Confirm New Password</Label>
                    <Input id="confirm_password" type="password" />
                  </div>
                </div>
                <Button variant="outline" onClick={() => handleSaveSettings("Password")}>
                  Change Password
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable_2fa">Enable 2FA</Label>
                      <p className="text-xs text-muted-foreground">
                        Require a verification code in addition to your password
                      </p>
                    </div>
                    <Switch id="enable_2fa" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Session Management</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto_logout">Auto Logout</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically log out after period of inactivity
                      </p>
                    </div>
                    <Switch id="auto_logout" defaultChecked />
                  </div>
                  <div className="space-y-2 max-w-xs">
                    <Label htmlFor="session_timeout">Session Timeout (minutes)</Label>
                    <Input id="session_timeout" type="number" defaultValue="30" />
                  </div>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    toast({
                      title: "Log Out All Devices",
                      description: "This action would log you out of all devices.",
                    });
                  }}
                >
                  Log Out All Devices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>API & Integrations</CardTitle>
              <CardDescription>
                Manage external integrations and API settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">API Access</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="api_access">Enable API Access</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow external applications to access data via API
                      </p>
                    </div>
                    <Switch id="api_access" defaultChecked />
                  </div>
                  <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">API Key</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "API Key Regenerated",
                            description: "Your API key has been regenerated.",
                          });
                        }}
                      >
                        Regenerate
                      </Button>
                    </div>
                    <p className="mt-2 font-mono text-sm bg-white p-2 border border-gray-200 rounded">
                      ••••••••••••••••••••••••••••••••
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Last used: 3 days ago from 192.168.1.1
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Connected Services</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                        <span className="font-semibold text-gray-600">QB</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">QuickBooks</h4>
                        <p className="text-xs text-muted-foreground">
                          Connected on May 12, 2023
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "QuickBooks Disconnected",
                          description: "Your QuickBooks account has been disconnected.",
                        });
                      }}
                    >
                      Disconnect
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                        <span className="font-semibold text-gray-600">SAP</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">SAP</h4>
                        <p className="text-xs text-muted-foreground">
                          Not connected
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Connect to SAP",
                          description: "SAP integration will be available in a future update.",
                        });
                      }}
                    >
                      Connect
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                        <span className="font-semibold text-gray-600">BP</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Bank Portal</h4>
                        <p className="text-xs text-muted-foreground">
                          Not connected
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Connect to Bank Portal",
                          description: "Bank Portal integration will be available in a future update.",
                        });
                      }}
                    >
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Settings;
