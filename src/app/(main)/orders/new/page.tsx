"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Check } from "lucide-react";
import { customers } from "@/data/customers";
import { equipment } from "@/data/equipment";
import { cn } from "@/lib/utils";

type OrderItem = {
  equipmentId: string;
  equipmentName: string;
  dailyRate: number;
  quantity: number;
  days: number;
};

export default function NewOrderPage() {
  const [step, setStep] = useState(1);
  const [customerId, setCustomerId] = useState("");
  const [siteName, setSiteName] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [days, setDays] = useState(30);

  const selectedCustomer = customers.find((c) => c.id === customerId);
  const availableEquipment = equipment.filter((e) => e.status === "available");

  const addItem = () => {
    const eq = equipment.find((e) => e.id === selectedEquipment);
    if (eq) {
      setOrderItems([
        ...orderItems,
        {
          equipmentId: eq.id,
          equipmentName: eq.name,
          dailyRate: eq.dailyRate,
          quantity,
          days,
        },
      ]);
      setSelectedEquipment("");
      setQuantity(1);
    }
  };

  const removeItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.dailyRate * item.quantity * item.days,
    0
  );

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                step >= s
                  ? "bg-[hsl(var(--primary))] text-white"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {step > s ? <Check className="h-4 w-4" /> : s}
            </div>
            <span className={cn("text-sm", step >= s ? "font-medium" : "text-muted-foreground")}>
              {s === 1 ? "顧客選択" : s === 2 ? "機材選択" : "確認・送信"}
            </span>
            {s < 3 && <div className="w-12 h-px bg-border" />}
          </div>
        ))}
      </div>

      {/* Step 1: Customer Selection */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: 顧客・現場情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">顧客</label>
              <Select value={customerId} onValueChange={setCustomerId}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="顧客を選択..." />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">現場名</label>
              <Input
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="例: 渋谷再開発プロジェクト"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">現場住所</label>
              <Input
                value={siteAddress}
                onChange={(e) => setSiteAddress(e.target.value)}
                placeholder="例: 東京都渋谷区渋谷2丁目"
                className="mt-1"
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!customerId || !siteName || !siteAddress}
              >
                次へ
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Equipment Selection */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: 機材選択</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium">機材</label>
                <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="機材を選択..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableEquipment.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.name} (¥{e.dailyRate.toLocaleString()}/日)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">数量</label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={1}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">日数</label>
                <Input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  min={1}
                  className="mt-1"
                />
              </div>
            </div>
            <Button onClick={addItem} disabled={!selectedEquipment} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              品目を追加
            </Button>

            {orderItems.length > 0 && (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>機材名</TableHead>
                      <TableHead className="text-right">単価/日</TableHead>
                      <TableHead className="text-right">数量</TableHead>
                      <TableHead className="text-right">日数</TableHead>
                      <TableHead className="text-right">小計</TableHead>
                      <TableHead className="w-[50px]" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.equipmentName}</TableCell>
                        <TableCell className="text-right">¥{item.dailyRate.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">{item.days}</TableCell>
                        <TableCell className="text-right">
                          ¥{(item.dailyRate * item.quantity * item.days).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(index)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                戻る
              </Button>
              <Button onClick={() => setStep(3)} disabled={orderItems.length === 0}>
                次へ
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: 確認・送信</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-medium mb-2">顧客情報</h3>
                <p className="text-sm">{selectedCustomer?.name}</p>
                <p className="text-sm text-muted-foreground">{siteName}</p>
                <p className="text-sm text-muted-foreground">{siteAddress}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">注文内容</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>機材名</TableHead>
                      <TableHead className="text-right">単価/日</TableHead>
                      <TableHead className="text-right">数量</TableHead>
                      <TableHead className="text-right">日数</TableHead>
                      <TableHead className="text-right">小計</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.equipmentName}</TableCell>
                        <TableCell className="text-right">¥{item.dailyRate.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">{item.days}</TableCell>
                        <TableCell className="text-right">
                          ¥{(item.dailyRate * item.quantity * item.days).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4} className="text-right font-bold">
                        合計
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        ¥{totalAmount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                戻る
              </Button>
              <Button className="bg-[hsl(var(--primary))]">
                注文を送信
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
